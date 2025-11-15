import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, data } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Create Supabase Admin client with service role key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Verify current user is admin
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('tier_code')
      .eq('id', user.id)
      .single();

    if (profileError || profile?.tier_code !== 'admin') {
      return NextResponse.json(
        { error: 'Insufficient permissions. Only admins can invite users.' },
        { status: 403 }
      );
    }

    // Invite user
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      email,
      {
        data: data || {},
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      }
    );

    if (inviteError) {
      console.error('Invite error:', inviteError);
      return NextResponse.json(
        { error: inviteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Invitation sent successfully',
      data: inviteData,
    });
  } catch (error: any) {
    console.error('Error inviting user:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
