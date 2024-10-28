export class ChangePassword {

    emailAddress: string;
    oldPassword: string;
    newPassword: string;

    constructor(emailAddress: string, oldPassword: string, newPassword: string) {
    this.emailAddress = emailAddress;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    }

}


