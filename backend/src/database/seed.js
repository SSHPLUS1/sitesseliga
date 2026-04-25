const bcrypt = require('bcryptjs');
const { query, initDatabase } = require('./db');

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database...');

    // Initialize database tables first
    await initDatabase();

    const hashedPassword = await bcrypt.hash('admin123456', 10);
    
    await query('DELETE FROM users WHERE email = $1', ['allkeyscomercio@gmail.com']);
    
    await query(
      `INSERT INTO users (email, password, name, role, username) 
       VALUES ($1, $2, $3, $4, $5)`,
      ['allkeyscomercio@gmail.com', hashedPassword, 'Administrador', 'admin', 'admin']
    );
    console.log('✅ Admin user created (email: allkeyscomercio@gmail.com, password: admin123456)');

    const plans = [
      {
        id: 1,
        name: '300MB',
        speed: '300 Mega',
        price: 70.00,
        features: ['Instalação grátis', 'Wantv incluído', 'Suporte 24/7'],
        is_popular: false,
        order_position: 1
      },
      {
        id: 2,
        name: '500MB',
        speed: '500 Mega',
        price: 80.00,
        features: ['Instalação grátis', 'Wifi-Plus', 'Wantv incluído', 'Looke (3 meses)', 'Suporte 24/7'],
        is_popular: false,
        order_position: 2
      },
      {
        id: 3,
        name: '600MB',
        speed: '600 Mega',
        price: 90.00,
        features: ['Instalação grátis', 'Wifi-Plus', 'Wantv incluído', 'Looke ou Deezer (3 meses)', 'Suporte 24/7'],
        is_popular: true,
        order_position: 3
      },
      {
        id: 4,
        name: '700MB',
        speed: '700 Mega',
        price: 100.00,
        features: ['Instalação grátis', 'Wifi6', 'Wantv incluído', '2 apps à escolha (6 meses)', 'HBO Max, Looke, Deezer, Watch ou Paramount', 'Suporte 24/7'],
        is_popular: false,
        order_position: 4
      },
      {
        id: 5,
        name: '800MB',
        speed: '800 Mega',
        price: 130.00,
        features: ['Instalação grátis', 'Wifi6', 'Wantv incluído', '2 apps à escolha (6 meses)', 'HBO Max, Looke, Deezer, Watch ou Paramount', 'Suporte 24/7'],
        is_popular: false,
        order_position: 5
      },
      {
        id: 6,
        name: '1GB',
        speed: '1 Giga',
        price: 150.00,
        features: ['Instalação grátis', 'Wifi6', 'Wantv incluído', '2 apps à escolha (1 ano)', 'HBO Max, Looke, Deezer, Watch ou Paramount', 'Suporte prioritário 24/7'],
        is_popular: false,
        order_position: 6
      }
    ];

    for (const plan of plans) {
      await query(
        `INSERT INTO plans (id, name, speed, price, features, is_popular, order_position, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'active')
         ON CONFLICT (id) DO NOTHING`,
        [plan.id, plan.name, plan.speed, plan.price, plan.features, plan.is_popular, plan.order_position]
      );
    }
    console.log('✅ Plans seeded successfully');

    // Seed positions
    const positions = [
      {
        name: 'Técnico de Redes',
        description: 'Responsável pela manutenção e configuração de redes de computadores',
        is_active: true
      },
      {
        name: 'Atendente',
        description: 'Atendimento ao cliente e suporte técnico',
        is_active: true
      },
      {
        name: 'Instalador',
        description: 'Instalação de equipamentos e serviços',
        is_active: true
      },
      {
        name: 'Vendedor',
        description: 'Vendas de planos e serviços de internet',
        is_active: true
      }
    ];

    for (const position of positions) {
      await query(
        'INSERT INTO job_positions (name, description, is_active) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING',
        [position.name, position.description, position.is_active]
      );
    }
    console.log('✅ Positions seeded successfully');

  await query(`
    INSERT INTO settings (id, phone, whatsapp, address, client_area_url, logo, favicon, created_at, updated_at)
    VALUES (1, $1, $2, $3, $4, $5, $6, NOW(), NOW())
    ON CONFLICT (id) DO UPDATE
    SET phone = $1, whatsapp = $2, address = $3, client_area_url = $4, logo = $5, favicon = $6, updated_at = NOW()
  `, [
    '(46) 3025-3800',
    '554630253800',
    'Rua Guarani , nº 1315 - Centro - Pato Branco-PR',
    'https://ispfy.aknet.net.br',
    '/uploads/settings/logo.png',
    '/uploads/settings/favicon.png'
  ]);
  console.log('✅ Settings seeded successfully');

    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { seedDatabase };
