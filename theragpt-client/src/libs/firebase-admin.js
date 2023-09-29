import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { auth } from 'firebase-admin';

const firebaseAdminConfig = {
  credential: cert({
    projectId: 'junggpt',
    client_email: 'firebase-adminsdk-7bh58@junggpt.iam.gserviceaccount.com',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6HhgYoRiaiZI2\n3n0oVHLuK2ysUex6IbOOVp7zPIbm12hv+PCkMu0u4zmprXhi36UTtaNd9Fx3O68z\nImebWx1D0BvVvTe9ez0vvI5ilTWko5XRw9GU9bkkDnc8V3lNuYNSQ3pCc4DP47C5\nR6pf7rIUOo2BFbf41OulHKcBeXOBkQ4YSXs7tjTbX6GXXfr9k7j71IXRe0WeMz6P\nkOJMZ7QTVjgcz4QS++b8g3I7xXgXS625LUJlrc1cuuzrqJxMJ+RubrxTVSBdNhRY\n6t9O83I5mQizQt0D0ptdVPRrjsJXGEgMEZ4n0cT8WbZCexX8CQJBxodigoCt4FFD\nVyJAb7y/AgMBAAECggEANhtenPZkbTTWXX4z+4AFg4j7SGNusJjQlu5Gumbbvwtb\ncMX5y3qEqo9jaZklOPVUi9TP4BYUtZMT3XVAkpEcAmVjWjFunXbQ9GpIKI/BLxJh\nkUBw0vHWt40/C7tQaBCpBUbZqazjg0xpyYt0k/wUKD5XefIC8GOR+AfK42pX8o/m\nhbp/gL2bnGAhHxCPxhSPuPQdszDzn28PBLTINvvX0cOlpDdODf2iA0E+f/I0lUK+\nKVdLmxSS3gfgb26h2yNeNzXdO2mcVy6i6Hbs2QSf+rBC9lLnIbDfh2bkWeqDiqnJ\nYQpbKVDA9KyE4l157fnS0HkfhEPBmnDO5KjJwv+sQQKBgQDgpQR73kTPBPbWB5GB\n9jkcb40OQZHGbe9Rgm8siD5uOebXGFj/eKUk3B+K4CBsGnA/kJ5AzmIErLKHm5op\nmZFCdnagzKHz9liy6Wh0UxSmG014i9li2ejHRRz7BYnq01wnQzg3frwDMPRr9f7P\nCwg6qYnLxGesNhZ4xeph/J6mfwKBgQDUGG5wgRvbIB57/OGF91ptEdc5Asd4o8bn\n+26DsrTT29/PhYIkyGdTVj9K3B9P+G6g+yg15rQjwKMZFvaufk3C8N3ronLQzr47\nw8yY0RT69Dche4v9VjvbEIHTKSBR912PnkrgcnduL782rtYR1YWaVGPjG/DzMdbE\nY6hj56ZJwQKBgQCcFgxnhKiKrwhS7i9L/ajw+REpNqXzGa+PEvHsHz5BmDmsel5c\nI5ebZNcFx3S/qB8WC4XpwXyZguUJFDSpcupbI7SJRaXBvQkkRsktCgzu3UmW2JTS\n+lWjH4JjaBXL88+z+CC3bnd0QC+UU/gYI7I0EFiOHIlsPqiegeW4763MQQKBgD70\nhYuVdyxCy2moNVTriAbJ/eVpQsY3buobAsHKwMwF/tf9XBUI+0qMVjslPZIiPsw/\n4L6nHR9jpcXjwBMpYHGVx3mS/ZunUmYxB0DxBtY6uUaSAoqPFzM+IhsIoRRTZY0k\nwjr/Hx4wxAQ6P0aJ559Yn1GhUJMPXx1qK2iEMSLBAoGBAL9VQ8qOtbrVHeOUEqNN\n4MEfpxoO8c33sWKapTMOV9UDIrTX6Lskg+Q2HybzA+l7BgtzCLOmB/0+dg3KsZYR\nwgB2WzVhKINr34dDBHywIrYOPpGW0EC8wqcfbuMvkkKXPWGBoLwtrmzjIlbB93Mb\nbe06FawHfkh6I8hQZ7G1Hx6N\n-----END PRIVATE KEY-----\n',
  }),
};

export function getAuth() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }

  return auth();
}
