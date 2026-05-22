resource "google_container_cluster" "primary" {
  name     = "saas-gke"
  location = "us-central1"

  initial_node_count = 2
}
