export const SubscriptionType = Object.freeze({
    FREE: 'free',
    PREMIUM: 'premium'
});


export default class User {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.is_active = data.is_active;
        this.is_superuser = data.is_superuser;
        this.is_verified = data.is_verified;
        this.telegram = data.telegram;
        this.whatsapp = data.whatsapp;
        this.linkedin = data.linkedin;
        this.subscription_type = data.subscription_type;
        this.phone_number = data.phone_number;
        this.profile_picture_url = data.profile_picture_url;
    }
}