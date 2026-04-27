const bcrypt = require('bcryptjs');

const testPassword = async () => {
  const password = 'admin123456';
  const hash = '$2y$10$BmpRY4wsIVTyLS7CA5koeu0NXG5IR7q2AIMG7VPxxF/vYdZ0zHKWC';
  
  console.log('Testing password:', password);
  console.log('Against hash:', hash);
  
  const isMatch = await bcrypt.compare(password, hash);
  console.log('Match:', isMatch);
  
  const newHash = await bcrypt.hash(password, 10);
  console.log('\nNew hash for same password:', newHash);
  
  const newIsMatch = await bcrypt.compare(password, newHash);
  console.log('Match with new hash:', newIsMatch);
};

testPassword().catch(console.error);
