import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 테스트 스위트 (Test Suite), 첫번째 인자는 테스트 스위트의 이름
describe('AppController', () => {
  let appController: AppController;

  /**
   * beforeAll() - 모든 테스트 케이스 시작 전 한번 실행
   * beforeEach() - 각 테스트 케이스 시작 전 한번씩 실행
   * afterEach() - 각 테스트 케이스 종료 후 한번씩 실행
   * afterAll() - 모든 테스트 케이스 종료 후 한번씩 실행
   */

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // 테스트 케이스 (Test Case), 첫번째 인자는 테스트 케이스의 이름
  /**
   * BDD(Behavior Driven Development) 스타일로 테스트 코드를 작성해보자
   * Given - 테스트 케이스의 선행조건(pre-condition). 즉, “어떤 상황이 주어졌을 때”를 뜻합니다.
   * When - 테스트 하고자 하는 대상코드를 실행. “대상 코드가 동작한다면”을 뜻함
   * Then - 대상코드의 수행 결과를 판단. “기대값과 수행결과가 맞는지”를 비교
   */
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
