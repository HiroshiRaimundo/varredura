import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Cria o admin padrão
  const adminEmail = 'odr@2025';
  const adminPassword = 'Ppgdas@2025';

  // Verifica se o admin já existe
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    // Cria o hash da senha
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    // Cria o admin
    await prisma.admin.create({
      data: {
        email: adminEmail,
        name: 'Administrador',
        passwordHash,
        role: 'admin'
      }
    });

    console.log('Admin criado com sucesso!');
  } else {
    console.log('Admin já existe!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 