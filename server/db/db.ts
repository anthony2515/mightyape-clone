import connection from './connection'
import { NewProducts } from '../../models/newProducts'

export function displayProducts() {
  return connection('products').select()
}

export function insertProducts(result: NewProducts) {
  // const filePath = picture;
  console.log('database', result)
  return connection('products')
    .insert(result)
    .returning([
      'product_name',
      'product_price',
      'product_image',
      'product_type',
    ])
}

export function deleteProduct(id: number) {
  return connection('products').delete().where('product_id', id)
}
