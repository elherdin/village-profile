module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'plantunganAdminSecretKey2025'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'plantunganApiTokenSalt2025'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'plantunganTransferTokenSalt2025'),
    },
  },
});
