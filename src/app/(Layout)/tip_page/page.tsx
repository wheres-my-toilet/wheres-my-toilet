import TipList from '@/components/tip_page/TipList';

const Page = () => {
  return (
    <div>
      <div className="border-t-2 border-black border-b-2 justify-center sm:justify-start hidden sm:block w-500;">
        <div className="hidden sm:flex h-72 items-center justify-center w-500">
          <div>
            <h1 className="text-4xl mb-4">응아 잘 하는 TIP</h1>
            <h1 className="text-2xl mb-3">관심가는 카드를 클릭해보세요!</h1>
          </div>
        </div>
      </div>
      <div className="justify-center items-center flex h-10 sm:hidden w-500 mt-3">
        <p className="text-2xl">응아 잘하는 TIP</p>
      </div>
      <TipList />
    </div>
  );
};

export default Page;
