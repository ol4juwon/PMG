const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'HTTP_BASIC_USER':
        return 'olajuwon';
      case 'HTTP_BASIC_PASS':
        return 12345;
      case 'TMDB_KEY':
        return '1a47d932506fd02b2927ecb25c1ddd5f';
      case 'DATABASE_TYPE':
        return 'postgres';
      case 'DATABASE_HOST':
        return '127.0.0.1';
      case 'DATABASE_USER':
        return 'concher_admin';
      case 'DATABASE_NAME':
        return 'montech';
      case 'DATABASE_PASSWORD':
        return 'concher1234';
      case 'DATABASE_PORT':
        return 5432;
    }
  },
};

export default mockedConfigService;
// HTTP_BASIC_USER=olajuwon
// HTTP_BASIC_PASS=12345
// DATABASE_TYPE="postgres"
// DATABASE_HOST="manny.db.elephantsql.com"
// DATABASE_PORT=5432
// DATABASE_USER=qzstcfiy
// DATABASE_PASSWORD="KaW6VEBSIfVFdYxLQ5HyXiZHYieAkVpV"
// DATABASE_NAME="qzstcfiy"