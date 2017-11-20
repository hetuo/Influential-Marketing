import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';


//render a single header for a product
const ProductHeader = ({ product }) => {
  return (
    <div>
    <Card>
      <CardHeader
        title={ product.title }
        avatar={<Avatar backgroundColor='#00bcd4' size='40' style={{ top: "8px" }}>T</Avatar>}
      />
      <CardMedia>
        <img src={ product.image1 } alt="" />
      </CardMedia>
      <CardText style={{maxlength: '15'}}>
        { product.body }
      </CardText>
    </Card>
  </div>
  );
};

export default ProductHeader;
