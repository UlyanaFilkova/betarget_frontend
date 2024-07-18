export default class User {
    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.is_active = data.is_active;
        this.is_superuser = data.is_superuser;
        this.is_verified = data.is_verified;
        this.username = data.username;
        this.telegram = data.telegram;
        this.whatsapp = data.whatsapp;
        this.linkedin = data.linkedin;
        this.phone_number = data.phone_number;
        this.profile_picture = data.profile_picture;
    }
}