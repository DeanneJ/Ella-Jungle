import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';

export function ActivityCard({ activity, img, onAddToPackage }) {
  const handleAddToPackage = () => {
    onAddToPackage(activity); // Call the onAddToPackage function with the activity object
  };

  return (
    <div className='p-[5px]'>
      <Card className='mt-6 w-[300px]'>
        <CardHeader color='blue-gray' className='relative h-[120px] mt-[20px]'>
          <img src={img} alt={activity.name} />
        </CardHeader>
        <CardBody>
          <Typography variant='h5' color='blue-gray' className='mb-2'>
            {activity.name}
          </Typography>
          <Typography>
            Description : {activity.description}
            <br />
            Price : Rs.{activity.price} per person
            <br />
          </Typography>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button className='m-[5px] bg-green-500' onClick={handleAddToPackage}>
            Add to Package
          </Button>
          <Button className='bg-green-500'>See More</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
