variable "envfile" {
  type    = string
  default = ".env"
}

locals {
  envfile = {
    for line in split("\n", file(var.envfile)):
    split("=", line)[0] => trimspace(split("=", line)[1])
    if !startswith(line, "#") && length(split("=", line)) > 1
  }
}

env "local" {
  url      = local.envfile["DATABASE_URL"]
  dev_url  = local.envfile["DATABASE_URL"]
  schemas  = ["public"]
}
