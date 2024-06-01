import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export const ProductCardSkeleton = () => {
  return (
    <Card className='flex flex-col overflow-hidden animate-pulse'>
      <div className='w-full h-auto aspect-video bg-gray-300'></div>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription>
          <div className='w-3/4 h-6 bg-gray-300 rounded-full' />
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='w-full h-4 bg-gray-300 rounded-full' />
        <div className='w-full h-4 bg-gray-300 rounded-full' />
        <div className='w-full h-4 bg-gray-300 rounded-full' />
      </CardContent>
      <CardFooter>
        <Button className='w-full' disabled></Button>
      </CardFooter>
    </Card>
  );
};
