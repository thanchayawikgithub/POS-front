import { ref } from "vue";
import { defineStore } from "pinia";
import type Member from "@/types/Member";

export const useCounterStore = defineStore("member", () => {
  const memberList = ref<Member[]>([]);
  const registerMember = (member: Member) => {
    memberList.value.push(member);
  };
  return { memberList, registerMember };
});
