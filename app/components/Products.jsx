import React from 'react';
import { Link } from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1000,
    height: 750,
    overflowY: 'auto',
  },
};

const tilesData = [
  {
    img: '/images/ourstory.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: '/images/newarrival.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
];

export default ({ products, category, location }) => (
  <div className="product-grid">
    {
      category && category.name ?
      (<ol className="breadcrumb">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Restaurant</Link></li>
        <li className="active">{category.name}</li>
      </ol>) :
      (<ol className="breadcrumb">
        <li><Link to="/">Home</Link></li>
        <li className="active">Restaurant</li>
      </ol>)
    }

  <div style={styles.root}>
    <GridList
      cellHeight={280}
      style={styles.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={tile.img} />
        </GridTile>
      ))}

      {products && products.map(product => (
          <GridTile
            key={product.image1}
            title={product.title}
            subtitle={<span>by <b>influencer{product.influencer_id}</b></span>}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
          <a href={`/products/${product.id}`}>
            <img border="0" src={product.image1}/>
          </a>
          </GridTile>
         ))
      } 
    </GridList>
  </div>
  </div>
);
