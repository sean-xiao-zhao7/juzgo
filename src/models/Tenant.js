import User from "./User";

class Tenant extends User {
    inquiries = [];

    setAccessCode(code) {
        this.code = code;
    }

    addInquiry(inquiry) {
        this.inquiries.push(inquiry);
    }
}

export default Tenant;
