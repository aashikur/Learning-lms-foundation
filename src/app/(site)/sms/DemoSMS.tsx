import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DemoSendSMS } from '@/services/sms.service';
import React from 'react'
import { useForm } from 'react-hook-form'

function DemoSMS() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      smsContent: 'bkash received Tk 8500 TnxID 9999 from 017XXXXXXXX. Your balance is Tk 10000. Thank you.',
    },
  });
  const onSubmit = async (data: any) => {
    console.log(data);
    const res = await DemoSendSMS({ text: data.smsContent });
    console.log(res);
  }
  return (
    <div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4  p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Mobile SMS Form Simulator</h2>
                <div className="flex flex-col">
                    <Textarea className="text-gray-600 " placeholder="Enter SMS content..." {...register('smsContent')} />

                </div>
                <Button type="submit" className="bg-blue-600   hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition-colors max-w-xs ml-auto">
                    Submit
                </Button>
            </form>
        </div>

    )
}

export default DemoSMS