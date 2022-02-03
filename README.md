# 🏠 GGUMIM-PROJECT | 집 꾸미기 기업 과제 프로젝트

### 📎 배포 주소

> <u>[과제 링크](http://gguminproject.s3-website.ap-northeast-2.amazonaws.com/)

## 👫 팀원

- Front-end: 최병현

## 🗓 개발 기간

- 기간: 2022년 2월 1일 ~ 2022년 2월 4일(4일간)

## 🛠 기술 스택

- React(Functional-Component)
> react-router-dom, react-redux, redux-saga, immer
- Styled-Components 
- JavaScript(ES6)

## 구조
```
📦src
 ┣ 📂components
 ┃ ┗ 📂common
 ┃ ┃ ┣ 📜FurnitureFigure.js
 ┃ ┃ ┗ 📜Tooltip.js
 ┣ 📂containers
 ┃ ┗ 📂FurnitureView
 ┃ ┃ ┗ 📜FurnitureViewFormContainer.js
 ┣ 📂hooks
 ┃ ┗ 📜useSwiper.js
 ┣ 📂lib
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜client.js
 ┃ ┃ ┗ 📜furnitureView.js
 ┃ ┗ 📜createRequestSaga.js
 ┣ 📂modules
 ┃ ┣ 📜furnitureView.js
 ┃ ┣ 📜index.js
 ┃ ┗ 📜loading.js
 ┣ 📂pages
 ┃ ┗ 📂FurnitureView
 ┃ ┃ ┣ 📜FurnitureViewForm.js
 ┃ ┃ ┣ 📜FurnitureViewPage.js
 ┃ ┃ ┗ 📜FurnitureViewTemplate.js
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyle.js
 ┃ ┗ 📜theme.js
 ┣ 📂utils
 ┣ 📜Router.js
 ┣ 📜config.js
 ┗ 📜index.js
```

## 📍 주요 구현 사항
- Click event 발생 시 현재 Click 여부에 따라 각기 다른 액션 dispatch
```javascript
  import {
  registerCurrentCheckedProduct,
  deleteCurrentCheckedProduct,
} from '../../modules/furnitureView';
  
  const checkCurrentProduct = event => {
    const productId = event.target.id;

    if (currentSelectedProductInfo.productId) { // 현재 product info가 활성화 되어 있는 경우
      dispatch(deleteCurrentCheckedProduct()); // 해당 prodcut info를 비활성화

      if (currentSelectedProductInfo.productId !== Number(productId)) // 현재 product info 외에 다른 product info를 활성하고자 할 경우
        dispatch(registerCurrentCheckedProduct(productId)); 
    } else dispatch(registerCurrentCheckedProduct(productId)); // 처음 product info를 활성화 하고자 하는 경우
  };
```
- 현재 활성화 되어 있는 상품 정보를 Redux Reducer에서 처리 및 저장
```javascript
  const furnitureView = handleActions(
  {
    ( ... )
  
    [REGISTER_CURRENT_CHECKED_PRODUCT]: (state, { payload: productId }) => // 새로운 상품 정보를 저장
      produce(state, draft => {
        draft.currentSelectedProductInfo = state.productList.find(
          product => product.productId === Number(productId)
        );
      }),
    [DELETE_CURRENT_CHECKED_PRODUCT]: state => ({ // 기존에 활성화된 상품 정보를 삭제
      ...state,
      currentSelectedProductInfo: {},
    }),
  },
  initialState
);
```
- useSelector를 통해 store에 저장된 현재 활성화된 상품 정보를 토대로 동적 랜더링
> useSelecor를 통해 현재 활성화된 상품 정보 값을 가져옴
```javascript
   const currentSelectedProductInfo = useSelector(
    ({ furnitureView }) => furnitureView.currentSelectedProductInfo
  );
```
  
> toolTip 활성화 및 내부 버튼 이미지 변경
```javascript
  ( ... )
  
  {productList.map(({ productId, pointX, pointY }, index) => {
          return (
            <TagButton key={index} pointX={pointX} pointY={pointY}>
              <img
                id={productId}
                className="tagImage"
                alt="tagImage"
                src={`${
                  currentSelectedProductInfo.productId === productId
                    ? './images/icon-tag_delete.png'
                    : './images/icon-tag_search.png'
                }`}
                onClick={checkCurrentProduct}
              />
              {productId === currentSelectedProductInfo.productId && (
                <Tooltip
                  currentRoomViewSize={currentRoomViewSize}
                  currentSelectedProductInfo={currentSelectedProductInfo}
                />
              )}
            </TagButton>
          );
        })}
  
      ( ... )
```
## 💁‍♂️ 소감 및 후기
> custom Hook을 사용하여 Carousel Slider 기능을 구현하였고, 이는 컴포넌트 분립 및 활용에 있어서 좋은 학습 기회가 되었다. 또한 reudx를 통해 flux 기반의 data-flow 환경을 프로젝트 내에 적용함으로써, 작업 과정에서 state값을 용이하게 관리할 수 있었다. 


## 📄 레퍼런스

- 이 프로젝트는 <u>[프론트앤드 프리온보딩 집 꾸미기 기업 과제](https://wecode.notion.site/a087a4edd6094bd0b94ec906a28731ab)를 참조하여 만들었습니다.
- 본 과제는 저작권의 보호를 받으며, 문제에 대한 정보를 배포하는 등의 행위를 금지 합니다.
