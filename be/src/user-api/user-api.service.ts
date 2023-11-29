import { Injectable } from "@nestjs/common";
import { UserLoginDto } from "../user/dto/user-login.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "../auth/auth.service";
import { HttpResponse } from "../utils/http.response";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { ImageService } from "../image/image.service";

@Injectable()
export class UserApiService {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private imageService: ImageService,
  ) {}

  async register(dto: CreateUserDto): Promise<string> {
    await this.userService.register(dto);
    const body: HttpResponse = {
      message: "회원가입 성공",
    };

    return JSON.stringify(body);
  }

  async login(dto: UserLoginDto): Promise<string> {
    const userUuid = await this.userService.login(dto);
    const token = this.authService.issue(userUuid);

    const body: HttpResponse = {
      message: "로그인 성공",
      data: {
        token: token,
      },
    };
    return JSON.stringify(body);
  }

  async delete(token: string): Promise<string> {
    const userUuid = this.authService.verify(token);
    await this.userService.deleteAccount(userUuid);

    const body: HttpResponse = {
      message: "회원탈퇴 완료",
    };
    return JSON.stringify(body);
  }

  async getUserInfo(token: string) {
    const userUuid = this.authService.verify(token);
    const userEntity = await this.userService.getUserEntity(userUuid);

    const result: HttpResponse = {
      message: "회원 정보 조회 성공",
      data: {
        nickname: userEntity.nickname,
        email: userEntity.email,
        profileUrl: userEntity.profileUrl,
      },
    };
    return JSON.stringify(result);
  }

  async updateUserInfo(token: string, profileImage: Express.Multer.File, nickname: string) {
    const userUuid = this.authService.verify(token);
    let profileImageUrl = null;

    // 사용자가 파일을 업로드 했을 때
    if (!!profileImage) {
      profileImageUrl = await this.imageService.uploadImage(profileImage);
    }

    await this.userService.update(userUuid, nickname, profileImageUrl);

    const result: HttpResponse = {
      message: "정보 수정 성공",
    };
    return JSON.stringify(result);
  }
}
