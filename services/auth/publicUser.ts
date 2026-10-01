type UserRecord = object & { userPassword?: unknown };

export function toPublicUser<T extends UserRecord>(user: T): Omit<T, "userPassword"> {
  const copy = { ...user };
  delete copy.userPassword;
  return copy;
}

export function toPublicUsers<T extends UserRecord>(users: T[]): Array<Omit<T, "userPassword">> {
  return users.map((user) => toPublicUser(user));
}
