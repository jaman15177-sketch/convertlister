import axios from "axios";

const VAULT_URL = "http://localhost:8200";

export async function writeVaultSecret(
  path: string,
  secret: any
) {
  return axios.post(
    `${VAULT_URL}/v1/secret/data/${path}`,
    {
      data: secret,
    },
    {
      headers: {
        "X-Vault-Token":
          process.env.VAULT_TOKEN || "",
      },
    }
  );
}
