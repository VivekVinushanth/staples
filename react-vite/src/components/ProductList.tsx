import { FunctionComponent, ReactElement } from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

interface Product {
  product_name: string;
  star_rating: number;
  price: string;
  image_url: string;
}

const products: Product[] = [
  { product_name: 'Crayola Crayons 24-Pack', star_rating: 4.9, price: '$1.99', image_url: 'https://www.staples-3p.com/s7/is/image/Staples/F26DDEFF-4824-4895-BC070726A57B234D_sc7?wid=360&hei=360' },
  { product_name: "Elmer's Glue Sticks, 12/Pack", star_rating: 4.8, price: '$5.49', image_url: 'https://www.staples-3p.com/s7/is/image/Staples/sp162555406_sc7?wid=700&hei=700' },
  { product_name: 'BIC Round Stic Ballpoint Pens, 60/Pack', star_rating: 4.7, price: '$5.99', image_url: 'https://www.staples-3p.com/s7/is/image/Staples/73C341C6-995A-4A53-BF65624E901AD28A_sc7?wid=700&hei=700' },
  { product_name: 'Sharpie Permanent Markers, 12/Pack', star_rating: 4.8, price: '$9.99', image_url: 'https://www.staples-3p.com/s7/is/image/Staples/51DE7465-E0F3-4E7B-8B192C2A97DA4667_sc7?wid=700&hei=700' },
  { product_name: 'Five Star Notebooks, 3-Subject', star_rating: 4.6, price: '$5.49', image_url: 'https://www.staples-3p.com/s7/is/image/Staples/953A2296-257F-4E11-92C96B1564B4D0AC_sc7?wid=700&hei=700' },
  { product_name: 'Ticonderoga Pencils, 96/Pack', star_rating: 4.8, price: '$9.99', image_url: 'https://www.staples-3p.com/s7/is/image/Staples/F2DD1AC4-D7B7-416F-9230D16D44BEF6B0_sc7?wid=700&hei=700' },
  { product_name: 'EXPO Dry Erase Markers, 12/Pack', star_rating: 4.7, price: '$14.99', image_url: 'https://www.staples-3p.com/s7/is/image/Staples/s1194015_sc7?wid=700&hei=700' },
  { product_name: 'Mead Spiral Notebooks, 10/Pack', star_rating: 4.5, price: '$17.49', image_url: 'https://www.staples-3p.com/s7/is/image/Staples/sp38165442_sc7?wid=700&hei=700' },
  { product_name: 'Fiskars Scissors, 2/Pack', star_rating: 4.8, price: '$4.99', image_url: 'https://www.staples-3p.com/s7/is/image/Staples/s1204433_sc7?wid=700&hei=700' },
  { product_name: 'Post-it Super Sticky Notes, 12/Pack', star_rating: 4.7, price: '$15.99', image_url: 'https://www.staples-3p.com/s7/is/image/Staples/D4F44CC0-78FD-4BC5-8A859B38A37BA6F2_sc7?wid=700&hei=700' },
  { product_name: 'Staples 1-Subject Notebooks, 6/Pack', star_rating: 4.5, price: '$6.49', image_url: 'https://www.staples-3p.com/s7/is/image/Staples/295D4ADA-B35F-4D91-A81E5828773DE0FF_sc7?wid=700&hei=700' },
  { product_name: 'Paper Mate Flair Felt Tip Pens, 20/Pack', star_rating: 4.6, price: '$19.99', image_url: 'https://www.staples-3p.com/s7/is/image/Staples/86D56ADD-82A9-4C07-B0A289A87A248BF7_sc7?wid=700&hei=700' },
];

const ProductList: FunctionComponent = (): ReactElement => {
  return (
    <Grid container spacing={2}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
