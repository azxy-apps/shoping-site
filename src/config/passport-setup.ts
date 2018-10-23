import GoogleStrategy from "passport-google-oauth20";


export default (passport) =>{
    passport.use(
        new GoogleStrategy({
            callbackURL: '/auth/google/redirect',
            clientID: '133937814016-65nbct7s8man90884nil9bs7n9ds8psr.apps.googleusercontent.com',
            clientSecret: 'uN45P0CR3RoI-q2QU7C4txS7'
        }, (accessToken, refreshToken, profile, done) => {
            // callback
            console.log('passport call back fired');
            console.log(profile);
            done();
        })
    );

};