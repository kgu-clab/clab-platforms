# clab-platforms &middot; [![GitHub License](https://img.shields.io/github/license/kgu-clab/clab-platforms)](https://github.com/kgu-clab/clab-platforms/blob/main/LICENSE) [![pnpm CI](https://github.com/kgu-clab/clab-platforms/actions/workflows/app-ci.yml/badge.svg)](https://github.com/kgu-clab/clab-platforms/actions/workflows/pnpm-ci.yml) [![codecov](https://codecov.io/gh/kgu-clab/clab-platforms/graph/badge.svg?token=Z5PFR6US6Z)](https://codecov.io/gh/kgu-clab/clab-platforms)

[경기대학교 AI컴퓨터공학부 개발동아리 C-Lab](https://www.clab.page/)의 공식 프론트엔드 시스템이에요.

해당 프로젝트는 단순히 동아리 내에서 사용할 목적으로 시작되었지만, 그 목표와 가능성은 훨씬 더 넓고 깊은 의미를 지니고 있어요.

## What is C-Lab Platforms?

**다양한 모임이 활동하는 과정에서 마주할 수 있는 여러 문제점을 해소**하고자 해요. `소통의 어려움`, `자료 공유 및 관리`, `활동 계획의 비효율성` 등 모임에서 발생하는 불편한 문제를 해결하고자 하며 **궁극적으로 모든 구성원이 자연스럽게 연결되어 몰입하고 열정을 마음껏 펼칠 수 있는 커뮤니티**를 만드는 거예요.

동아리를 넘어 대학이라는 큰 커뮤니티를 통합하고자 끊임없이 도전하고 있어요. 해당 프로젝트가 대학교 커뮤니티의 `Best Practice`가 되어 구성원이 자연스럽게 연결되고, 시너지를 발휘하며 구성원들이 만족하고 사용할 수 있는 시스템을 구축하는 것을 지향하고 있어요.

## Key features

> 해당 모노레포에 포함된 모든 프로젝트는 다음과 같은 특징을 가지고 있어요.

- 지속가능한 개발과 원활한 인수인계를 위해 간단한 코드라도 **주석**을 작성해요.
- 최신 기술만을 고집하지 않고 문제 해결에 필요한 **최적의 기술을 선정**하여 사용해요.
- 일관된 사용자 경험을 제공하기 위해 자체 개발한 **Design System**을 사용하고 있어요.

## Apps

![monorepo diagram](https://github.com/user-attachments/assets/fae92084-3945-47ee-b1a9-fffad4a09cd9)

> @clab-platforms의 프로젝트 구성도예요. 더 자세히 알고 싶다면 해당 프로젝트의 `README.md`를 살펴봐주세요.

### [member](https://github.com/kgu-clab/clab-platforms/blob/main/apps/member) &middot; [![Website](https://img.shields.io/website?url=https%3A%2F%2Fplay.clab.page&up_message=online&up_color=black&down_message=offline&down_color=black&label=in%20production&labelColor=black)](https://play.clab.page/)

모임이 자연스럽게 온라인에서 이뤄질 수 있도록 커뮤니티, 운영관리를 제공하는 서비스이에요.

### time &middot; ![WIP](https://img.shields.io/badge/work_in_progress-black)

학교 생활에 필요한 모든 정보를 제공하는 정보 서비스이에요.

### land &middot; [![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.clab.page&up_message=online&up_color=black&down_message=offline&down_color=black&label=in%20production&labelColor=black)](https://www.clab.page/)

모임에 대한 브랜딩, 소개와 모집을 위한 랜딩페이지 서비스이에요.

### auth &middot; [![Website](https://img.shields.io/website?url=https%3A%2F%2Fauth.clab.page&up_message=online&up_color=black&down_message=offline&down_color=black&label=in%20production&labelColor=black)](https://auth.clab.page/)

계정을 OAuth 프로토콜을 기반으로 서비스를 편리하게 연결할 수 있는 통합 인증 시스템이에요.

## Packages

### [design-system](https://github.com/kgu-clab/clab-platforms/tree/main/packages/design-system) &middot; ![WIP](https://img.shields.io/badge/work_in_progress-black)

일관성 있는 UI&UX를 위한 디자인 시스템이에요. @clab-platforms의 모든 프로젝트는 해당 디자인 시스템을 사용해요.

## Server

> 서버에 대한 정보는 아래 저장소에서 확인할 수 있어요.

### [clab-platforms-server](https://github.com/kgu-clab/clab-platforms-server)

경기대학교 AI컴퓨터공학부 개발동아리 C-Lab의 공식 백엔드 시스템이에요.

## Contributing

동아리원이 아니더라도 누구나 기여할 수 있습니다. 해당 프로젝트에 기여하고 싶다면 아래 문서를 참고해주세요.

[CONTRIBUTING.md](https://github.com/kgu-clab/clab-platforms/blob/main/CONTRIBUTING.md)

### Contributors

[![contributors](https://contrib.rocks/image?repo=KGU-C-Lab/clab-platforms)](https://github.com/kgu-clab/clab-platforms/contributors)

## FAQs

<details>
  <summary>해당 시스템을 참고하거나 자유롭게 사용해도 되나요?</summary>
  네, 가능합니다! 이 프로젝트는 GNU 라이센스 하에 배포되어 있으며, 라이센스 조건에 따라 자유롭게 사용하실 수 있어요.
</details>

<details>
  <summary>시스템에서 오류를 발견했어요. 어떻게 해야 하나요?</summary>
  모든 사용자의 기여를 환영합니다! 버그를 발견하셨거나 프로젝트에 기여하고 싶으신 경우, 프로젝트의 <code>Contributing</code> 섹션을 확인해주세요.
</details>

<details>
  <summary>기타 문의 사항이 있어요. 어디서 할 수 있나요?</summary>
  Github에 기재된 <code>EMail</code>에 문의 남겨주시거나 공식 홈페이지 우측 하단의 <code>라이브챗</code>을 이용해주세요.
</details>

## License

C-Lab의 모든 공개 프로젝트는 [GNU General Public License v3.0](https://github.com/kgu-clab/clab-platforms/blob/main/LICENSE)의 라이선스를 따라요.  
자세한 사항은 [프로젝트의 라이선스](LICENSE)를 참고해주세요.

GPL-3.0 © Kyonggi University C-Lab
