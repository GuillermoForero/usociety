export const ACTIVE = 'ACTIVE';
export const PENDING = 'PENDING';
export const REJECTED = 'REJECTED';
export const DELETED = 'DELETED';

export class UpdateUserMembership {
    user;
    status;
    role;

    constructor(user, status, role) {
        this.user = user;
        this.status = status;
        this.role = role;
    }
}

