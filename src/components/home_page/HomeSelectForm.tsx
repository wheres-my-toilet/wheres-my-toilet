import { HomeSelectFormType } from '@/types/home_page/types';

function HomeSelectForm({ selectSee, selectGunGue, handleSelectCity, handleSelectCounty }: HomeSelectFormType) {
  return (
    <>
      <form className=" m-2 flex justify-center align-center ">
        <div className="flex items-center  justify-between  ">
          <p className="p-4 font-bold text-1xl  sm:text-xl ">지역명으로 검색하기</p>
          <div>
            <select
              value={selectSee}
              onChange={handleSelectCity}
              className="border-2 m-2 p-2 text-black border-black font-bold "
            >
              <option value="시 선택">시/도 선택</option>

              <option value="서울특별시">서울특별시</option>
              <option value="대구광역시">대구광역시</option>
              <option value="경기도">경기도</option>
              <option value="부산광역시">부산광역시</option>
              <option value="인천광역시">인천광역시</option>
              <option value="광주광역시">광주광역시</option>
              <option value="대전광역시">대전광역시</option>
              <option value="울산광역시">울산광역시</option>
              <option value="세종특별자치시">세종특별자치시</option>
              <option value="충청북도">충청북도</option>
              <option value="충청남도">충청남도</option>
              <option value="전북특별자치도">전북특별자치도</option>
              <option value="전라남도">전라남도</option>
              <option value="경상북도">경상북도</option>
              <option value="경상남도">경상남도</option>
              <option value="제주특별자치도">제주특별자치도</option>
            </select>

            <select
              value={selectGunGue}
              onChange={handleSelectCounty}
              className="border-2 m-2 p-2 text-black border-black font-bold"
            >
              <option value="구 선택">군/구 선택</option>

              {selectSee === '서울특별시' && (
                <>
                  <optgroup label="서울특별시">
                    <option value="종로구">종로구</option>
                    <option value="중구">중구</option>
                    <option value="용산구">용산구</option>
                    <option value="성동구">성동구</option>
                    <option value="광진구">광진구</option>
                    <option value="동대문구">동대문구</option>
                    <option value="중랑구">중랑구</option>
                    <option value="성북구">성북구</option>
                    <option value="강북구">강북구</option>
                    <option value="도봉구">도봉구</option>
                    <option value="노원구">노원구</option>
                    <option value="서대문구">서대문구</option>
                    <option value="양천구">양천구</option>
                    <option value="구로구">구로구</option>
                    <option value="금천구">금천구</option>
                    <option value="영등포구">영등포구</option>
                    <option value="동작구">동작구</option>
                    <option value="관악구">관악구</option>
                    <option value="서초구">서초구</option>
                    <option value="강남구">강남구</option>
                    <option value="송파구">송파구</option>
                    <option value="강동구">강동구</option>
                  </optgroup>
                </>
              )}

              {selectSee === '대구광역시' && (
                <optgroup label="대구광역시">
                  <option value="동구">동구</option>
                  <option value="서구">서구</option>
                  <option value="북구">북구</option>
                  <option value="달서구">달서구</option>
                  <option value="달성군">달성군</option>
                  <option value="군위군">군위군</option>
                </optgroup>
              )}

              {selectSee === '경기도' && (
                <optgroup label="경기도">
                  <option value="동두천시">동두천시</option>
                  <option value="안산시">안산시</option>
                  <option value="과천시">과천시</option>
                  <option value="남양주시">남양주시</option>
                  <option value="안양시">안양시</option>
                  <option value="부천시">부천시</option>
                  <option value="광명시">광명시</option>
                  <option value="오산시">오산시</option>
                  <option value="시흥시">시흥시</option>
                  <option value="군포시">군포시</option>
                  <option value="하남시">하남시</option>
                  <option value="용인시">용인시</option>
                  <option value="김포시">김포시</option>
                  <option value="여주시">여주시</option>
                  <option value="연천군">연천군</option>
                  <option value="가평군">가평군</option>
                  <option value="화성시">화성시</option>
                  <option value="광주시">광주시</option>
                  <option value="양주시">양주시</option>
                </optgroup>
              )}

              {selectSee === '부산광역시' && (
                <>
                  <optgroup label="부산광역시">
                    <option value="중구">중구</option>
                    <option value="서구">서구</option>
                    <option value="동구">동구</option>
                    <option value="영도구">영도구</option>
                    <option value="부산진구">부산진구</option>
                    <option value="남구">남구</option>
                    <option value="북구">북구</option>
                    <option value="해운대구">해운대구</option>
                    <option value="강서구">강서구</option>
                    <option value="연제구">연제구</option>
                    <option value="사상구">사상구</option>
                    <option value="기장군">기장군</option>
                  </optgroup>
                </>
              )}
              {selectSee === '인천광역시' && (
                <>
                  <optgroup label="인천광역시">
                    <option value="미추홀구">미추홀구</option>
                    <option value="남동구">남동구</option>
                    <option value="부평구">부평구</option>
                    <option value="강화군">강화군</option>
                  </optgroup>
                </>
              )}
              {selectSee === '광주광역시' && (
                <>
                  <optgroup label="광주광역시">
                    <option value="북구">북구</option>
                    <option value="광산구">광산구</option>
                  </optgroup>
                </>
              )}
              {selectSee === '대전광역시' && (
                <>
                  <optgroup label="대전광역시">
                    <option value="동구">동구</option>
                    <option value="중구">중구</option>
                    <option value="유성구">유성구</option>
                    <option value="대덕구">대덕구</option>
                  </optgroup>
                </>
              )}
              {selectSee === '울산광역시' && (
                <>
                  <optgroup label="울산광역시">
                    <option value="남구">남구</option>
                    <option value="동구">동구</option>
                    <option value="북구">북구</option>
                  </optgroup>
                </>
              )}
              {selectSee === '강원특별자치도' && (
                <>
                  <optgroup label="강원특별자치도">
                    <option value="춘천시">춘천시</option>
                    <option value="강릉시">강릉시</option>
                    <option value="태백시">태백시</option>
                    <option value="영월군">영월군</option>
                    <option value="철원군">철원군</option>
                    <option value="양구군">양구군</option>
                    <option value="고성군">고성군</option>
                  </optgroup>
                </>
              )}
              {selectSee === '충청북도' && (
                <>
                  <optgroup label="충청북도">
                    <option value="충주시">충주시</option>
                    <option value="제천시">제천시</option>
                    <option value="보은군">보은군</option>
                    <option value="영동군">영동군</option>
                    <option value="진천군">진천군</option>
                    <option value="괴산군">괴산군</option>
                    <option value="음성군">음성군</option>
                    <option value="단양군">단양군</option>
                    <option value="증평군">증평군</option>
                  </optgroup>
                </>
              )}
              {selectSee === '충청남도' && (
                <>
                  <optgroup label="충청남도">
                    <option value="당진시">당진시</option>
                    <option value="천안시">천안시</option>
                    <option value="공주시">공주시</option>
                    <option value="보령시">보령시</option>
                    <option value="아산시">아산시</option>
                    <option value="논산시">논산시</option>
                    <option value="금산군">금산군</option>
                    <option value="부여군">부여군</option>
                    <option value="서천군">서천군</option>
                    <option value="청양군">청양군</option>
                    <option value="홍성군">홍성군</option>
                    <option value="예산군">예산군</option>
                    <option value="태안군">태안군</option>
                    <option value="계룡시">계룡시</option>
                  </optgroup>
                </>
              )}
              {selectSee === '전북특별자치도' && (
                <>
                  <optgroup label="전북특별자치도">
                    <option value="익산시">익산시</option>
                    <option value="정읍시">정읍시</option>
                    <option value="김제시">김제시</option>
                  </optgroup>
                </>
              )}
              {selectSee === '전라남도' && (
                <>
                  <optgroup label="전라남도">
                    <option value="순천시">순천시</option>
                    <option value="고흥군">고흥군</option>
                    <option value="보성군">보성군</option>
                    <option value="장흥군">장흥군</option>
                    <option value="영암군">영암군</option>
                    <option value="영광군">영광군</option>
                    <option value="신안군">신안군</option>
                  </optgroup>
                </>
              )}
              {selectSee === '경상북도' && (
                <>
                  <optgroup label="경상북도">
                    <option value="포항시">포항시</option>
                    <option value="경주시">경주시</option>
                    <option value="김천시">김천시</option>
                    <option value="안동시">안동시</option>
                    <option value="영주시">영주시</option>
                    <option value="영천시">영천시</option>
                    <option value="상주시">상주시</option>
                    <option value="문경시">문경시</option>
                    <option value="경산시">경산시</option>
                    <option value="의성군">의성군</option>
                    <option value="청송군">청송군</option>
                    <option value="고령군">고령군</option>
                    <option value="성주군">성주군</option>
                    <option value="예천군">예천군</option>
                    <option value="봉화군">봉화군</option>
                    <option value="울진군">울진군</option>
                    <option value="울릉군">울릉군</option>
                  </optgroup>
                </>
              )}
              {selectSee === '경상남도' && (
                <>
                  <optgroup label="경상남도">
                    <option value="창원시">창원시</option>
                    <option value="진주시">진주시</option>
                    <option value="통영시">통영시</option>
                    <option value="사천시">사천시</option>
                    <option value="밀양시">밀양시</option>
                    <option value="의령군">의령군</option>
                    <option value="함안군">함안군</option>
                    <option value="하동군">하동군</option>
                    <option value="함양군">함양군</option>
                    <option value="거창군">거창군</option>
                    <option value="합천군">합천군</option>
                  </optgroup>
                </>
              )}
              {selectSee === '제주특별자치도' && (
                <>
                  <optgroup label="제주특별자치도">
                    <option value="제주시">제주시</option>
                    <option value="서귀포시">서귀포시</option>
                  </optgroup>
                </>
              )}
            </select>
          </div>
        </div>
      </form>
    </>
  );
}

export default HomeSelectForm;
