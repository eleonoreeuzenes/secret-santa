#!/bin/bash

# Secret Santa Project Deployment Script
# Usage: ./deploy.sh [--skip-build] [--skip-backup] [--production]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="secretsanta"
BACKUP_DIR="./backups"
FRONTEND_DIR="./client"
SERVER_DIR="./server"
COMPOSE_FILE="docker-compose.yml"

# Parse arguments
SKIP_BUILD=false
SKIP_BACKUP=false
PRODUCTION=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --skip-backup)
            SKIP_BACKUP=true
            shift
            ;;
        --production)
            PRODUCTION=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [--skip-build] [--skip-backup] [--production]"
            exit 1
            ;;
    esac
done

# Utility functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required files exist
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if [ ! -f "$COMPOSE_FILE" ]; then
        log_error "docker-compose.yml not found!"
        exit 1
    fi
    
    if [ ! -f "nginx.conf" ]; then
        log_error "nginx.conf not found!"
        exit 1
    fi
    
    if [ ! -f ".env" ]; then
        log_warning ".env file not found. Make sure to create one with your environment variables."
    fi
    
    if [ ! -d "$FRONTEND_DIR" ]; then
        log_error "Frontend directory not found: $FRONTEND_DIR"
        exit 1
    fi
    
    if [ ! -d "$SERVER_DIR" ]; then
        log_error "Server directory not found: $SERVER_DIR"
        exit 1
    fi
    
    # Check if docker and docker-compose are installed
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed!"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed!"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Create backup directory
create_backup_dir() {
    if [ ! -d "$BACKUP_DIR" ]; then
        mkdir -p "$BACKUP_DIR"
        log_info "Created backup directory: $BACKUP_DIR"
    fi
}

# Backup database
backup_database() {
    if [ "$SKIP_BACKUP" = true ]; then
        log_warning "Skipping database backup (--skip-backup flag)"
        return
    fi
    
    log_info "Creating database backup..."
    
    # Check if MongoDB container is running
    if docker-compose ps | grep -q "mongodb.*Up"; then
        TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
        BACKUP_FILE="$BACKUP_DIR/mongodb_backup_$TIMESTAMP.tar.gz"
        
        # Create backup
        docker-compose exec -T mongodb mongodump --archive | gzip > "$BACKUP_FILE"
        
        if [ $? -eq 0 ]; then
            log_success "Database backup created: $BACKUP_FILE"
        else
            log_error "Database backup failed!"
            exit 1
        fi
    else
        log_warning "MongoDB container not running, skipping backup"
    fi
}

# Build Angular frontend
build_frontend() {
    if [ "$SKIP_BUILD" = true ]; then
        log_warning "Skipping frontend build (--skip-build flag)"
        return
    fi
    
    log_info "Building Angular frontend..."
    
    cd "$FRONTEND_DIR"
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        log_info "Installing frontend dependencies..."
        npm install
    fi
    
    # Build for production
    if [ "$PRODUCTION" = true ]; then
        log_info "Building for production..."
        npm run build --prod
    else
        log_info "Building for development..."
        npm run build
    fi
    
    if [ $? -eq 0 ]; then
        log_success "Frontend build completed"
    else
        log_error "Frontend build failed!"
        exit 1
    fi
    
    cd ..
}

# Deploy with Docker Compose
deploy_services() {
    log_info "Deploying services with Docker Compose..."
    
    # Pull latest images
    log_info "Pulling latest Docker images..."
    docker-compose pull
    
    # Build and start services
    log_info "Starting services..."
    docker-compose up -d --build
    
    if [ $? -eq 0 ]; then
        log_success "Services deployed successfully"
    else
        log_error "Deployment failed!"
        exit 1
    fi
}

# Health check
health_check() {
    log_info "Performing health check..."
    
    # Wait for services to start
    sleep 10
    
    # Check if containers are running
    if docker-compose ps | grep -q "Up"; then
        log_success "Containers are running"
    else
        log_error "Some containers are not running!"
        docker-compose ps
        exit 1
    fi
    
    # Check if frontend is accessible (optional - requires curl)
    if command -v curl &> /dev/null; then
        log_info "Testing frontend accessibility..."
        if curl -f -s http://localhost:80 > /dev/null; then
            log_success "Frontend is accessible"
        else
            log_warning "Frontend health check failed (this might be normal if using Traefik)"
        fi
    fi
}

# Cleanup old backups (keep last 5)
cleanup_backups() {
    log_info "Cleaning up old backups..."
    
    if [ -d "$BACKUP_DIR" ]; then
        # Keep only the 5 most recent backups
        ls -t "$BACKUP_DIR"/mongodb_backup_*.tar.gz 2>/dev/null | tail -n +6 | xargs -r rm
        log_success "Backup cleanup completed"
    fi
}

# Show deployment summary
show_summary() {
    log_success "=== DEPLOYMENT COMPLETED ==="
    echo
    log_info "Services status:"
    docker-compose ps
    echo
    log_info "Frontend URL: https://secretsanta.eleonoreeuzenes.fr"
    log_info "API URL: https://secretsanta.eleonoreeuzenes.fr/api"
    echo
    log_info "To view logs: docker-compose logs -f"
    log_info "To stop services: docker-compose down"
}

# Rollback function
rollback() {
    log_error "Deployment failed. Starting rollback..."
    
    # Stop current containers
    docker-compose down
    
    # You can add more rollback logic here if needed
    log_info "Rollback completed"
    exit 1
}

# Main deployment process
main() {
    echo -e "${BLUE}===== Secret Santa Deployment =====${NC}"
    echo "Started at: $(date)"
    echo
    
    # Set up error handling
    trap rollback ERR
    
    # Run deployment steps
    check_prerequisites
    create_backup_dir
    backup_database
    build_frontend
    deploy_services
    health_check
    cleanup_backups
    show_summary
    
    echo
    log_success "Deployment completed successfully at: $(date)"
}

# Run main function
main "$@"