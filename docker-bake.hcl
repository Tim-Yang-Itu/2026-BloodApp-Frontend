# ============================================================
# Docker Buildx Bake — satu build, satu target.
#
#   docker buildx bake --push    # build + push image :latest
#   docker buildx bake --print   # cek konfigurasi tanpa build
#
# Aplikasi ini UI-only (tanpa backend/API), jadi tidak ada build arg
# VITE_* atau .env — bundle yang sama dipakai di semua environment.
# ============================================================

variable "REGISTRY" {
  default = "urfixxy/donorku-frontend"
}

variable "TAG" {
  default = "latest"
}

variable "NODE_VERSION" {
  default = "22-alpine"
}

variable "NGINX_VERSION" {
  default = "stable-alpine"
}

# Tambah "linux/arm64" bila target server ARM (butuh emulasi/QEMU).
variable "PLATFORMS" {
  default = "linux/amd64"
}

group "default" {
  targets = ["web"]
}

target "web" {
  context    = "."
  dockerfile = "Dockerfile"
  target     = "runtime"
  platforms  = split(",", PLATFORMS)
  tags       = ["${REGISTRY}:${TAG}"]

  args = {
    NODE_VERSION  = NODE_VERSION
    NGINX_VERSION = NGINX_VERSION
  }

  labels = {
    "org.opencontainers.image.title"       = "donorku-frontend"
    "org.opencontainers.image.description" = "DarahTerpadu donor darah SPA (React 19 + Vite, nginx runtime)"
    "org.opencontainers.image.version"     = TAG
    "org.opencontainers.image.licenses"    = "UNLICENSED"
  }
}