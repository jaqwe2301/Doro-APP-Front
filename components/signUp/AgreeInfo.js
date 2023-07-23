import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Bar from "../ui/Bar";

function AgreeInfo() {
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView>
          <Text style={styles.title}>
            ‘어플리케이션 운영주체’로서 문의사항 접수 및 처리 등 의 서비스를
            제공하기 위하여 아래와 같이 개인정보를 수집합니다.
          </Text>
          <Text style={styles.title}>제1조(목적)</Text>
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}1.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              본 약관은 DORO가 운영하는 온라인 사이트
              'DORO(https://doroedu.net)'에서 제공하는 서비스(이하 '서비스'라
              합니다)를 이용함에 있어 당사자의 권리 의무 및 책임사항을 규정하는
              것을 목적으로 합니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}2.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지
              않는 한 본 약관을 준용합니다.
            </Text>
          </View>

          <Text style={styles.title}>제2조(정의)</Text>
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}1.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'라 함은, 'DORO'가 재화 또는 용역을 이용자 에게 제공하기
              위하여 컴퓨터 등 정보통신설비를 이용하여 재화등을 거래할 수 있도록
              설정한 가상의 영업장을 운영하는 사업자를 말하며, 아울러
              'DORO(https://doroedu.net)'을 통해 제공되는 전자상거래 관련
              서비스의 의미로도 사용합니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}2.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '이용자'라 함은, '사이트'에 접속하여 본 약관에 따라 '회사'가
              제공하는 서비스를 받는 회원 및 비회원을 말합니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}3.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회원'이라 함은, '회사'에 개인정보를 제공하고 회원으로 등록한
              자로서, '회사'의 서비스를 계속 하여 이용할 수 있는 자를 말합니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}4.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '비회원'이라 함은, 회원으로 등록하지 않고, '회사'가 제공하는
              서비스를 이용하는 자를 말합니다.
            </Text>
          </View>
          <Text style={styles.title}>제3조(약관 외 준칙)</Text>
          <View style={{ marginTop: 14, marginHorizontal: 20 }}>
            <Text style={styles.content}>
              {"\u0020 "}본 약관에서 정하지 아니한 사항은 법령 또는 회사가 정한
              서비스의 개별 약관, 운영정책 및 규칙(이하 '세부 지침'이라
              합니다)의 규정에 따릅니다. 또한 본 약관과 세부지침이 충돌할
              경우에는 세부지침이 우선합니다.
            </Text>
          </View>
          <Text style={styles.title}>제4조(약관의 명시 및 개정)</Text>
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}1.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지,
              전화번호, 모사전송번호(FAX), 전자우편 주소, 사업자등록번호,
              통신판매업신고 번호 등을 이용자가 쉽게 알 수 있도록 '회사' 홈페
              이지의 초기 서비스화면에 게시합니다. 다만 본 약관의 내용은
              '이용자'가 연결화면을 통하여 확인 할 수 있도록 할 수 있습니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}2.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'는 '이용자'가 약관에 동의하기에 앞서 약관에 정해진 내용 중
              청약철회, 배송책임, 환불조건 등과 같은 내용을 '이용자'가 이해할 수
              있도록 별도의 연결화면 또는 팝업화면 등을 통하여 '이용자'의 확인을
              구합니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}3.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'는 '전자상거래 등에서의 소비자보호에 관한 법률', '약관의
              규제에 관한 법률','전자거래기본법', '정보통신망 이용촉진등에 관한
              법률', '소비자보호 법' 등 관련법령(이하 '관계법령'이라 합니다)에
              위배되지 않는 범위내에서 본 약관을 개정할 수 있습니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}4.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'가 본 약관을 개정하고자 할 경우, 적용일자 및 개정사유를
              명시하여 현행약관과 함께 온라인 사이 트의 초기화면에 그 적용일자
              7일전부터 적용일자 전날까지 공지합니다. 다만, '이용자'에게 불리한
              내용으로 약관을 변경하는 경우 최소 30일 이상 유예기간을 두고
              공지합니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}5.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'가 본 약관을 개정한 경우, 개정약관은 적용일자 이후 체결되는
              계약에만 적용되며 적용일자 이전 체결된 계약에 대해서는 개정 전
              약관이 적용됩니다. 다만, 이미 계약을 체결한 '이용자'가 개정약관의
              내용을 적용받고자 하는 뜻을 '회사'에 전달하고 '회사'가 여기에
              동의한 경우 개정약관을 적용합니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}6.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              본 약관에서 정하지 아니한 사항 및 본 약관의 해석에 관하여는
              관계법령 및 건전한 상관례에 따릅니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}7.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              기타 '회사'가 정하는 업무
            </Text>
          </View>
          <Text style={styles.title}>제5조(서비스의 중단 등)</Text>
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}1.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'가 제공하는 서비스는 연중무휴, 1일 24시간 제공을 원칙으로
              합니다. 다만 '회사' 시스템의 유지 · 보수를 위한 점검, 통신장비의
              교체 등 특별한 사유가 있는 경우 서비스의 전부 또는 일부에 대하여
              일시적인 제공 중단이 발생할 수 있습니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}2.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'는 전시, 사변, 천재지변 또는 이에 준하는 국가비상사태가
              발생하거나 발생할 우려가 있는 경우, 전기통신사업법에 의한
              기간통신사업자가 전기통신서비스를 중지하는 등 부득이한 사유가
              발생한 경우 서비스의 전부 또는 일부를 제한하거나 중지할 수
              있습니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}3.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'가 서비스를 정지하거나 이용을 제한하는 경우 그 사유 및 기간,
              복구 예정 일시 등을 지체 없이 '이용자'에게 알립니다.
            </Text>
          </View>
          <Text style={styles.title}>제6조(회원가입)</Text>
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}1.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'가 정한 양식에 따라 '이용자'가 회원정보를 기입한 후 본
              약관에 동의한다는 의사표시를 함으로 써 회원가입을 신청합니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}2.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'는 전항에 따라 회원가입을 신청한 '이용자' 중 다음 각호의
              사유가 없는 한 '회원'으로 등록 합니다.
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}a.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              가입신청자가 본 약관에 따라 회원자격을 상실한 적이 있는 경우.
              다만, '회사'의 재가입 승낙을 얻 은 경우에는 예외로 합니다.
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}b.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              회원정보에 허위, 기재누락, 오기 등 불완전한 부분이 있는 경우
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}c.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              기타 회원으로 등록하는 것이 '회사'의 운영에 현저한 지장을 초래하는
              것으로 인정되는 경우
            </Text>
          </View>

          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}3.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              회원가입 시기는 '회사'의 가입승낙 안내가 '회원' 에게 도달한
              시점으로 합니다.
            </Text>
          </View>
          <Text style={styles.title}>제7조(회원탈퇴 및 자격상실 등)</Text>
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}1.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회원'은 '회사'에 언제든지 탈퇴를 요청할 수 있으며, '회사'는
              지체없이 회원탈퇴 요청을 처리합니다. 다만 이미 체결된 거래계약을
              이행할 필요가 있는 경우에는 본약관이 계속 적용됩니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}2.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'는 다음 각호의 사유가 발생한 경우 '회사'의 자격을 제한 또는
              정지시킬 수 있습니다.
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}a.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              회원가입 시 허위정보를 기재한 경우
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}b.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              관계법령 또는 본 약관에서 금지하는 행위를 한 경우
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}c.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              다른 이용자의 정상적인 이용을 방해하는 경우
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}d.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              공서양속에 어긋나는 행위를 한 경우
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}e.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              기타 '회원'으로 등록하는 것이 적절하지 않은 것으로 판단되는 경우
            </Text>
          </View>

          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}3.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'의 서비스를 1년 동안 이용하지 않는 '회원'의 경우
              휴면계정으로 전환하고 서비스 이용을 제한할 수 있습니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}4.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              휴면계정 전환 시 계정 활성을 위해 필요한 아이디 (ID), 비밀번호,
              이름, 중복가입 방지를 위한 본인 인증값(DI), 휴대전화 번호를 제외한
              나머지 정보는 삭제됩니다. 다만, 관계법령에 의해 보존할 필요가 있는
              경우 '회사'는 정해진 기간 동안 회원정보를 보관합니다.
            </Text>
          </View>
          <Text style={styles.title}>제8조(회원에 대한 통지)</Text>
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}1.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'는 '회원' 회원가입 시 기재한 전자우편, 이동전화번호, 주소
              등을 이용하여 '회원'에게 통지 할 수 있습니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}2.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'가 불특정 다수 '회원'에게 통지하고자 하는 경우 1주일 이상
              '사이트'의 게시판에 게시함으로써 개별 통지에 갈음할 수 있습니다.
              다만 '회원'이 서비 스를 이용함에 있어 중요한 사항에 대하여는 개별
              통지합니다.
            </Text>
          </View>
          <Text style={styles.title}>제9조(계약의 성립)</Text>
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}1.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'는 다음 각호의 사유가 있는 경우 본 약관의 '강의신청' 조항에
              따른 강의신청을 승낙하지 않을 수 있습니다. '
            </Text>
          </View>

          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}a.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              신청 내용에 허위, 누락, 오기가 있는 경우
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}b.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              회원자격이 제한 또는 정지된 고객이 신청한 경우
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}c.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              부정한 방법이나 목적으로 강의를 신청하였음이 인정되는 경우
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}d.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              기타 강의신청을 승낙하는 것이 '회사'의 기술상 현저한 지장을
              초래하는 것으로 인정되는 경우
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}e.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              기타 '회원'으로 등록하는 것이 적절하지 않은 것으로 판단되는 경우
            </Text>
          </View>

          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}2.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'의 승낙이 본 약관의 '수신확인통지' 형태로 이용자에게 도달한
              시점에 계약이 성립한 것으로 봅니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}3.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'가 승낙의 의사표시를 하는 경우 이용자의 강의신청에 대한 확인
              및 가능여부, 강의신청의 정정 및 취소 등에 관한 정보가 포함되어야
              합니다.
            </Text>
          </View>
          <Text style={styles.title}>제10조(‘회사'의 의무)</Text>
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}1.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'는 관계법령, 본 약관이 금지하거나 공서양속에 반하는 행위를
              하지 않으며 약관이 정하는 바에 따라 지속적 · 안정적으로 재화 및
              용역을 제공하는데 최선 을 다하여야 합니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}2.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'는 '이용자'가 안전하게 인터넷 서비스를 이용할 수 있도록
              개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}3.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'가 상품에 대하여 '표시 · 광고의 공정화에 관한 법률' 제3조
              소정의 부당한 표시 · 광고행위를 하여 '이용자'가 손해를 입은 때에는
              이를 배상할 책임을 집니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}4.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'는 '이용자'의 수신동의 없이 영리목적으로 광고성 전자우편,
              휴대전화 메시지, 전화, 우편 등을 발송하지 않습니다.
            </Text>
          </View>
          <Text style={styles.title}>제11조(이용자 및 회원의 의무)</Text>
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}1.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '이용자'는 회원가입 신청 시 사실에 근거하여 신청서를 작성해야
              합니다. 허위, 또는 타인의 정보를 등록한 경우 '회사'에 대하여
              일체의 권리를 주장할 수 없으며, '회사'는 이로 인하여 발생한 손해
              에 대하여 책임을 부담하지 않습니다.
            </Text>
          </View>

          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}2.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '이용자'는 본 약관에서 규정하는 사항과 기타 '회사' 가 정한 제반
              규정 및 공지사항을 준수하여야 합니다. 또한 '이용자'는 '회사'의
              업무를 방해하는 행위 및 '회사'의 명예를 훼손하는 행위를 하여서는
              안 됩니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}3.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '이용자'는 주소, 연락처, 전자우편 주소 등 회원정보 가 변경된 경우
              즉시 이를 수정해야 합니다. 변경된 정보를 수정하지 않거나 수정을
              게을리하여 발생하는 책임은 '이용자'가 부담합니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}4.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '이용자'는 다음의 행위를 하여서는 안됩니다.
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}a.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'에 게시된 정보의 변경
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}b.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'가 정한 정보 외의 다른 정보의 송신 또는 게시
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}c.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사' 및 제3자의 저작권 등 지식재산권에 대한 침해
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}d.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사' 및 제3자의 명예를 훼손하거나 업무를 방해하는 행위
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}e.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              외설 또는 폭력적인 메시지, 화상, 음성 기타 관계법령 및 공서양속에
              반하는 정보를 '회사'의 '사이트'에 공개 또는 게시하는 행위
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}5.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회원'은 부여된 아이디(ID)와 비밀번호를 직접 관리해야 합니다.
            </Text>
          </View>
          <Text style={styles.title}>제12조(저작권의 귀속 및 이용)</Text>
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}1.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'가 제공하는 서비스 및 이와 관련된 모든 지식재산권은 '회사'에
              귀속됩니다
            </Text>
          </View>

          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}2.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '이용자'는 '회사'에게 지식재산권이 있는 정보를 사전 승낙없이 복제,
              송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나,
              제3자가 이용하게 하여서는 안됩니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}3.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '이용자'가 서비스 내에 게시한 게시물, 이용후기 등 콘텐츠(이하
              '콘텐츠')의 저작권은 해당 '콘텐츠'의 저작자에게 귀속됩니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}4.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              전항의 규정에도 불구하고 '회사'는 서비스의 운영, 전시, 전송, 배포,
              홍보 등의 목적으로 별도의 허락 없이 무상으로 저작권법 및 공정한
              거래관행에 합치 되는 범위 내에서 다음 각호와 같이 '이용자'가 등록
              한 저작물을 이용할 수 있습니다.
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
              marginLeft: 40,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}a.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'가 제공하는 서비스 내에서 '이용자'가 작성한 '콘텐츠'의 복제,
              수정, 전시, 전송, 배포 등 저작권을 침해하지 않는 범위 내의 2차적
              저작물 또는 편집 저작물 작성을 위한 사용. 다만 '이용자'가 해당
              '콘텐츠'의 삭제 또는 사용중지를 요청하는 경우 관련법에 따라 보존
              해야하는 사항을 제외하고 관련 '콘텐츠'를 모두 삭제 또는
              사용중지합니다.
            </Text>
          </View>
          <Text style={styles.title}>제13조(분쟁의 해결)</Text>
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Text style={styles.content}>
              {"\u0020 "}1.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'는 '이용자'가 제기하는 불만사항 및 의견을 지체없이 처리하기
              위하여 노력합니다. 다만 신속한 처리가 곤란한 경우 '이용자'에게 그
              사유와 처리 일정을 즉시 통보해 드립니다.
            </Text>
          </View>

          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}2.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'와 '이용자'간 전자상거래에 관한 분쟁이 발생한 경우,
              '이용자'는 한국소비자원, 전자문서 · 전자거래분쟁조정위원회 등
              분쟁조정기관에 조정을 신청할 수 있습니다.
            </Text>
          </View>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text style={styles.content}>
              {"\u0020 "}3.{"\u0020 "}
            </Text>
            <Text style={[styles.content, { marginRight: 20 }]}>
              '회사'와 '이용자'간 발생한 분쟁에 관한 소송은 '회사' 소재지를
              관할하는 법원을 제1심 관할법원 으로 하며, 준거법은 대한민국의
              법령을 적용 합니다.
            </Text>
          </View>
          <Text style={styles.title}>부칙</Text>
          <Text style={styles.title}>제1조(시행일)</Text>
          <Text
            style={[
              styles.content,
              { marginTop: 14, marginHorizontal: 20, marginBottom: 20 },
            ]}
          >
            본 약관은 2023.05.22부터 적용합니다.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default AgreeInfo;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    marginLeft: 20,
    marginRight: 32,
    marginTop: 44,
  },
  content: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },
});
