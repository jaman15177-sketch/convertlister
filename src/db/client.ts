export class DB {
  private users: any[] = [];
  private tenants: any[] = [];

  // USERS
  insertUser(user: any) {
    this.users.push(user);
    return user;
  }

  findUserByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }

  findUserById(id: string) {
    return this.users.find(u => u.id === id);
  }

  // TENANTS
  insertTenant(tenant: any) {
    this.tenants.push(tenant);
    return tenant;
  }

  findTenantById(id: string) {
    return this.tenants.find(t => t.id === id);
  }
}

export const db = new DB();
