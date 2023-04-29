import { View, Text, StyleSheet, ScrollView } from "react-native";
import Bar from "../ui/Bar";

function AgreeInfo() {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Bar flex1={0} flex2={1} />
      <ScrollView>
        <Text style={styles.title}>
          ‘어플리케이션 운영주체’로서 문의사항 접수 및 처리 등 의 서비스를
          제공하기 위하여 아래와 같이 개인정보를 수집합니다.
        </Text>
        <Text style={styles.title}>수집항목 및 이용목적</Text>
        <View style={{ marginTop: 14, marginRight: 52 }}>
          <Text style={styles.content}>
            {""}
            {"\u0020 "}•{"\u0020 "}수집항목
          </Text>
          <Text style={styles.content}>
            이름. 휴대폰번호, 생년월일, 아이디, 비밀번호, 학교, 전공, 학번,
            재학유무
          </Text>
        </View>
        <View style={{ marginTop: 14 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.content}>
              {""}
              {"\u0020 "}•{"\u0020 "}이용목적
            </Text>
          </View>
          <Text style={styles.content}>개인식별, 문의사항 접수 및 처리</Text>
        </View>
        <View style={{ marginTop: 14 }}>
          <Text style={styles.content}>
            {""}
            {"\u0020 "}•{"\u0020 "}수집방법
          </Text>
          <Text style={styles.content}>어플리케이션 내 사용자 직접 입력</Text>
        </View>

        <Text style={styles.title}>개인정보의 보유 및 이용기간</Text>
        <View style={{ marginTop: 14 }}>
          <Text style={styles.content}>
            {""}
            {"\u0020 "}• {"\u0020 "}‘1:1문의’를 통해 입력한 개인정보는 최대
            3년까지 보관되며, 보존기간이 만료되었을 경우 즉시 파기를 진행합니다.
            또한, 사용자가 ‘어플리케이션 운영주체' 에게 본인의 개인정보 삭제
            요청 시 지체 없이 삭제를 진행하고 그에 대한 결과를 통보해 드립니다.
          </Text>
        </View>
        <Text style={styles.title}>개인정보의 파기방법</Text>
        <View style={{ marginTop: 14 }}>
          <Text style={styles.content}>
            {""}
            {"\u0020 "}• {"\u0020 "}전자적 파일형태(DB, PC)로 저장된 개인정보는
            기록을 재생할 수 없는 기술적 방법을 사용하여 파기 합니다. 종이로
            출력된 개인정보는 분쇄기로 분쇄하여 파기합니다.
          </Text>
        </View>
        <Text style={styles.title}>정보주체의 권리와 그 사용 방법</Text>
        <View style={{ marginTop: 14, marginBottom: 44 }}>
          <Text style={styles.content}>
            {""}
            {"\u0020 "}• {"\u0020 "}사용자는 아래 개인정보의 수집 및 이용에 관해
            동의 하지 않을 권리가 있습니다. 다만, ‘1:1문의'를 통해 제공받는
            정보는 문의를 처리하기에 필수적인 항목으로 해당 정보를 제공받지 못할
            경우 ‘1:1문의'를 이용하실 수 없습니다.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default AgreeInfo;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 20,
    marginLeft: 20,
    marginRight: 32,
    marginTop: 44,
  },
  content: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 20,
    marginRight: 20.5,
    marginLeft: 20,
  },
});
