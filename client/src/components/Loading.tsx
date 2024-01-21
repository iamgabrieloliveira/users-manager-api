import { Spinner } from '@nextui-org/spinner';

export default function Loading() {
    return (
        <div className="h-screen w-full bg-gray-200 flex items-center justify-center">
            <Spinner/>
        </div>
    );
}
