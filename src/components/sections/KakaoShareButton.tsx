import React, { useEffect, ReactNode } from "react";
import { weddingConfig } from "../../config/wedding-config";
import { ShareButton } from "./AccountSection"; // styled-components 버튼

interface Props {
  children: ReactNode;
}

const KakaoShareButton = ({ children }: Props) => {
  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(`${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}`);
          console.log("✅ Kakao SDK Initialized");
        }
      };
    } else if (!window.Kakao.isInitialized()) {
      window.Kakao.init(`${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}`);
      console.log("✅ Kakao SDK Initialized");
    }
  }, []);

  const shareKakao = () => {
    if (!window.Kakao || !window.Kakao.Link) {
      alert("Kakao SDK가 아직 준비되지 않았습니다.");
      return;
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: weddingConfig.meta.title,
        description: "모바일 청첩장에서 확인하세요!",
        imageUrl: `${process.env.NEXT_PUBLIC_SITE_URL}${weddingConfig.meta.ogImage}`,
        link: {
          mobileWebUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
          webUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
        },
      },
      buttons: [
        {
          title: "모바일 청첩장 보기",
          link: {
            mobileWebUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
            webUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
          },
        },
      ],
    });
  };

  return <ShareButton onClick={shareKakao}>카카오톡 공유하기</ShareButton>;
};

export default KakaoShareButton;