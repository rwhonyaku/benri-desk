// lib/toolComponents.tsx
import type { ComponentType } from "react"

import KaigyoCleanerClient from "@/components/tools/KaigyoCleanerClient"
import ZenkakuHankakuClient from "@/components/tools/ZenkakuHankakuClient"
import MojisuuCountClient from "@/components/tools/MojisuuCountClient"
import DateWithWeekdayClient from "@/components/tools/DateWithWeekdayClient"
import ZipcodeToAddressClient from "@/components/tools/ZipcodeToAddressClient"
import BankBusinessDayClient from "@/components/tools/BankBusinessDayClient"
import RegexTesterClient from "@/components/tools/RegexTesterClient"
import IpCheckClient from "@/components/tools/IpCheckClient"
import HttpHeadersClient from "@/components/tools/HttpHeadersClient"
import WhitespaceCleanerClient from "@/components/tools/WhitespaceCleanerClient"
import LineCountClient from "@/components/tools/LineCountClient"
import TabSpaceConverterClient from "@/components/tools/TabSpaceConverterClient"


export const toolComponents: Record<string, ComponentType> = {
  "kaigyo-cleaner": KaigyoCleanerClient,
  "zenkaku-hankaku": ZenkakuHankakuClient,
  "mojisuu-count": MojisuuCountClient,
  "date-with-weekday": DateWithWeekdayClient,
  "zipcode-to-address": ZipcodeToAddressClient,
  "bank-business-day": BankBusinessDayClient,
  "regex-tester": RegexTesterClient,
  "ip-check": IpCheckClient,
  "http-headers": HttpHeadersClient,
  "whitespace-cleaner": WhitespaceCleanerClient,
  "line-count": LineCountClient,
  "tab-space": TabSpaceConverterClient,
  
}
