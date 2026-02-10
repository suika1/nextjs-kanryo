import type { InsertProduct } from '@/types/product';
import type { InsertUser } from '@/types/user';

export const users: InsertUser[] = [
  {
    id: '56add4bb-0b38-4a17-9d36-5b11e837798e',
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '$2a$10$eOwLbLUnV91mi3/66/eah.tbyqJg4TCmSaRdQW5DPDpgs/KhpxeT6',
    createdAt: null,
  },
];

export const products: InsertProduct[] = ([] as InsertProduct[])
  .concat(
    ...Array.from(
      { length: 9 },
      () =>
        [
          {
            title: 'Футболка',
            price: 600,
            rating: 4.3,
            pic: '/futbolka-oversayz-2.png',
            description:
              'Стильная оверсайз футболка из качественного хлопка. Удобная и комфортная для повседневной носки.',
            material: '100% хлопок',
            brand: 'StreetWear',
            size: ['S', 'M', 'L', 'XL'],
            productType: 'Одежда',
            color: 'Чёрный',
            weight: '200 г',
            inStock: true,
          },
          {
            title: 'Шапка',
            price: 350,
            rating: 5.0,
            pic: '/hat.jpg',
            description:
              'Теплая и стильная шапка для холодного времени года. Отлично подходит для городских прогулок.',
            material: 'Шерсть 80%, Акрил 20%',
            brand: 'UrbanStyle',
            size: ['Универсальный'],
            productType: 'Аксессуары',
            color: 'Серый',
            weight: '150 г',
            inStock: false,
          },
          {
            title: 'Ботинки',
            price: 1233,
            rating: 4.8,
            pic: '/boots.jpg',
            description:
              'Прочные и надежные ботинки для активного отдыха и городских прогулок. Отличное качество и долговечность.',
            material: 'Натуральная кожа, резиновая подошва',
            brand: 'OutdoorPro',
            size: ['39', '40', '41', '42', '43', '44'],
            productType: 'Обувь',
            color: 'Коричневый',
            weight: '800 г',
            inStock: true,
          },
          {
            title: 'Рубашка',
            price: 777,
            rating: 4.9,
            pic: '/t-shirt.webp',
            description:
              'Классическая рубашка для офиса и повседневной носки. Отличное качество пошива и материалов.',
            material: 'Хлопок 60%, Полиэстер 40%',
            brand: 'ClassicWear',
            size: ['S', 'M', 'L', 'XL', 'XXL'],
            productType: 'Одежда',
            color: 'Красный',
            weight: '250 г',
            inStock: true,
          },
        ] as InsertProduct[],
    ),
  )
  .flat()
  .map((item, idx) => ({
    ...item,
    id: `9dbd9557-9b96-4932-906c-fcf334921f${idx < 10 ? `${idx}e` : idx + 1}`,
  }));
