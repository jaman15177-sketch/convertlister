resource "aws_backup_vault" "main" {
  name = "saas-backup-vault"
}

resource "aws_backup_plan" "daily" {
  name = "daily-backup"

  rule {
    rule_name         = "daily"
    target_vault_name = aws_backup_vault.main.name

    schedule = "cron(0 3 * * ? *)"
  }
}
