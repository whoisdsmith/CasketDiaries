import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Create a schema for the subscription form
const subscriptionSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

const NewsletterForm = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: SubscriptionFormValues) => {
      return apiRequest('POST', '/api/subscribe', values);
    },
    onSuccess: () => {
      toast({
        title: 'Subscription successful',
        description: 'Thank you for joining our journey!',
        variant: 'default',
      });
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/subscribers'] });
    },
    onError: (error) => {
      toast({
        title: 'Subscription failed',
        description: error.message || 'Please try again later',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: SubscriptionFormValues) => {
    mutate(values);
  };

  return (
    <>
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <p className="text-[#FF9E2C] font-serif text-xl mb-2">Thank You!</p>
          <p className="text-[#E8E8E8]">Your ember has joined our constellation.</p>
        </motion.div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your email address"
                      required
                      className="bg-[#2D2D2D] border border-[#E8E8E8] border-opacity-20 rounded-lg px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF9E2C]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#FF9E2C] hover:bg-[#F15A29] text-[#1D1D1D] font-medium px-6 py-3 rounded-lg transition-colors duration-300"
            >
              {isPending ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default NewsletterForm;
