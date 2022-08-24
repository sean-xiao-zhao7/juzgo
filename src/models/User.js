class User {
    constructor(firstname, lastname, email, phone) {
        this.id = new Date().toDateString();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
    }
}

export default User;
