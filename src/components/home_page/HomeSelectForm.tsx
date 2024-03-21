import { HomeSelectFormType } from '@/types/home_page/types';

function HomeSelectForm({ selectSee, selectGunGue, handleSelectCity, handleSelectCounty }: HomeSelectFormType) {
  return (
    <>
      <form>
        <select
          value={selectSee}
          onChange={handleSelectCity}
          className="border-2 m-2 p-2 text-black border-black font-bold"
        >
          <option value="시 선택">시 선택</option>
          <option value="서울특별시">서울특별시</option>
          <option value="대구광역시">대구광역시</option>
        </select>

        <select
          value={selectGunGue}
          onChange={handleSelectCounty}
          className="border-2 m-2 p-2 text-black border-black font-bold"
        >
          <option value="구 선택">군/구 선택</option>
          <option value="군위군">군위군</option>
          <option value="강동구">강동구</option>
          <option value="양천구">양천구</option>
        </select>
      </form>
    </>
  );
}

export default HomeSelectForm;
