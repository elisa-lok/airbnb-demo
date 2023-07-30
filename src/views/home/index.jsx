import React, { memo, useCallback, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { HomeWrapper } from './style'
import HomeBanner from './c-cpns/home-banner'
import { fetchHomeDataAction } from '@/store/modules/home'
//import SectionHeader from '@/components/section-header'
//import RoomItem from '@/components/room-item'
//import SectionRooms from '@/components/section-rooms'
import HomeSectionV1 from './c-cpns/home-section-v1'
import SectionHeader from '@/components/section-header'
import SectionRooms from '@/components/section-rooms'
import SectionTabs from '@/components/section-tabs'

const Home = memo(() => {
  /** get data fron redux */
  const { goodPriceInfo, highScoreInfo, discountInfo} = useSelector((state) => ({
    goodPriceInfo: state.home.goodPriceInfo,
    highScoreInfo: state.home.highScoreInfo,
    discountInfo: state.home.discountInfo,
  }), shallowEqual)

  /** tab names */
  const [ name, setName ] = useState('佛山');
  const tabNames = discountInfo.dest_address?.map(item => item.name);

  const tabClickHandle = useCallback(function(index, name){
    setName(name);
  },[])

  /** dispatch */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHomeDataAction('xxxx'));
  }, [dispatch]);

  return (
    <HomeWrapper>
      <HomeBanner />
      <div className='content'>
        <div className='discount'>
          <SectionHeader title={discountInfo?.title} subtitle= {discountInfo.subtitle} />
          <SectionTabs tabNames={tabNames} tabClick={tabClickHandle} />
          <SectionRooms roomList={discountInfo.dest_list?.[name]} itemWidth="33.33%" />
        </div>
        <HomeSectionV1 infoData= {goodPriceInfo} />
        <HomeSectionV1 infoData= {highScoreInfo} />
      </div>
    </HomeWrapper>
  )
})

export default Home