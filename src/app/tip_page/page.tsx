import TipList from '@/components/tip_page/TipList';

const page = () => {
  return (
    <div>
      <div className="h-72 border-t-2 border-black border-b-2 flex items-center justify-center">
        <div>
          <h1 className="text-4xl mb-4">응아 잘 하는 TIP</h1>
          <h1 className="text-2xl mb-3">관심가는 카드를 클릭해보세요!</h1>
        </div>
      </div>
      <TipList></TipList>
    </div>
  );
};

export default page;
