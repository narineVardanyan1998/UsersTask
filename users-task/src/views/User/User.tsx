import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../Home/hooks/useUsers';
import { Button } from '@/components/ui/button';
import { BallTriangle } from 'react-loader-spinner';

export const User = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: user, isLoading } = useUser(id);
  return (
    <div className="flex justify-center items-center h-screen">
      {isLoading ? (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          visible={true}
        />
      ) : (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <p>User: {user?.name}</p>
                <p>Email: {user?.email}</p>
                <p>City: {user?.address.city} </p>
                <p>Street: {user?.address.street}</p>
                <p>Suite: {user?.address.suite}</p>
              </div>
            </div>
          </CardContent>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Card>
      )}
    </div>
  );
};
