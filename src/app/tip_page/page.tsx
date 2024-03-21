import TipList from '@/components/tip_page/TipList';

const page = () => {
  return (
    <div>
      <div className="h-72 border-t-2 border-black border-b-2 flex items-center justify-center">
        <div>
          <h1 className="text-xl mb-4">오늘의 TIP</h1>
          <h1 className="text-4xl mb-3"> 제목 1</h1>
          <h2 className="mb-6">내용 1</h2>
        </div>
      </div>
      <TipList></TipList>
    </div>
  );
};

export default page;
