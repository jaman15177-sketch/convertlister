type RLSInput = {
  table: string;
  organizationColumn?: string;
};

export function generateRLSPolicy(input: RLSInput): string {
  const organizationColumn =
    input.organizationColumn || "organization_id";

  if (!input.table) {
    throw new Error("TABLE_REQUIRED");
  }

  return `
-- =========================================
-- AUTO GENERATED RLS POLICY (ORG ENGINE)
-- =========================================

ALTER TABLE ${input.table}
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "organization_isolation_policy"
ON ${input.table}
FOR ALL
USING (
  ${organizationColumn}
  =
  current_setting('app.organization_id')::text
);
`;
}

/**
 * OPTIONAL: multi-policy generator
 */
export function generateReadOnlyPolicy(
  table: string
): string {
  return `
CREATE POLICY "read_only_policy"
ON ${table}
FOR SELECT
USING (true);
`;
}
