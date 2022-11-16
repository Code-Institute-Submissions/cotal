import React from 'react';

import { ThreeSection } from '../../../components/layout/template/private-route/ThreeSection';
import { SideBarLeft } from '../../../components/page/three-section/SideBarLeft';
import { UserPost } from '../../../components/page/UserPost';
import { SideBarRight } from '../../../components/page/three-section/SideBarRight';

export default function Post({ params }) {
  console.log(params);
  return (
    <ThreeSection
      title="Your Post"
      leftStyles="hidden lg:block flex-1 max-w-60"
      middleStyles="flex-auto w-[500px] max-w-[782px]"
      rightStyles="hidden lg:block flex-1 max-w-60"
      componentLeft={SideBarLeft}
      componentMiddle={UserPost}
      componentRight={SideBarRight}
    />
  );
}
