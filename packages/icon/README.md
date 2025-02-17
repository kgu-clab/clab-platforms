# @clab-platforms/icon &middot; ![WIP](https://img.shields.io/badge/work_in_progress-black) ![GitHub package.json version](https://img.shields.io/github/package-json/v/KGU-C-Lab/clab-platforms?filename=packages%2Fdesign-system%2Fpackage.json&labelColor=black&color=black)

C-Lab icon은 동아리 플랫폼에서 사용되는 아이콘들을 제공하는 라이브러리에요.
자동화된 스크립트를 통해 SVG 파일을 최적화하고 이를 통해 리액트 컴포넌트로 제공하고있어요.

## Features

- `fill`기반의 SVG들을 리액트 컴포넌트화하여 제공해요.
- `currentColor`속성이 적용되어있어 색상의 커스터마이징이 가능해요.
- 컴포넌트 생성이 자동화되어있어 커맨드 입력으로 아이콘 컴포넌트들을 생성할 수 있어요.

## Getting started

- `fill` 기반의 SVG파일을 `color, outline, solid` 세 가지 디렉토리 중 svg폴더에 넣은 다음 아래의 커맨드를 입력해주세요.
- `pnpm -F @clab-platforms/icon build`
- 이미 컴포넌트 결과물이 있다면 `pnpm -F @clab-platforms/icon renew`를 사용해주세요.

## Contributing

동아리원이 아니더라도 누구나 기여할 수 있습니다. 해당 프로젝트에 기여하고 싶다면 아래 문서를 참고해주세요.

[CONTRIBUTING.md](https://github.com/kgu-clab/clab-platforms/blob/main/CONTRIBUTING.md)

### Contributors

[![contributors](https://contrib.rocks/image?repo=KGU-C-Lab/clab-platforms)](https://github.com/kgu-clab/clab-platforms/contributors)

## License

C-Lab의 모든 공개 프로젝트는 [GNU General Public License v3.0](https://github.com/kgu-clab/clab-platforms/blob/main/LICENSE)의 라이선스를 따라요.  
자세한 사항은 `LICENSE`를 참고해주세요.

GPL-3.0 © Kyonggi University C-Lab
