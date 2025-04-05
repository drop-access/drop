
import { NextRequest, NextResponse } from 'next/server'
import { verifyCloudProof, IVerifyResponse, ISuccessResult } from '@worldcoin/minikit-js'

interface IRequestPayload {
	payload: ISuccessResult
	action: string
	signal: string | undefined
}
// export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {

	const { payload, action } = (await req.json()) as IRequestPayload
	const app_id = process.env.APP_ID as `app_${string}`
	const verifyRes = (await verifyCloudProof(payload, app_id, action)) as IVerifyResponse // Wrapper on this
	if (verifyRes.success) {

		return NextResponse.json({ verifyRes, status: 200 })
	} else {
		return NextResponse.json({ verifyRes, status: 400 })
	}
}
