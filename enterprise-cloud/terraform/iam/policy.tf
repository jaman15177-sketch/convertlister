resource "aws_iam_policy" "saas_policy" {
  name = "saas-platform-policy"

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "s3:*",
          "ec2:Describe*"
        ]

        Resource = "*"
      }
    ]
  })
}
